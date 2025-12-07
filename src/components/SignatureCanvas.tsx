'use client';

import { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';

interface SignatureCanvasProps {
  onSignatureChange?: (hasSignature: boolean, dataUrl: string) => void;
  className?: string;
}

export interface SignatureCanvasRef {
  clear: () => void;
  isEmpty: () => boolean;
  getDataUrl: () => string;
}

const SignatureCanvas = forwardRef<SignatureCanvasRef, SignatureCanvasProps>(
  ({ onSignatureChange, className = '' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawingRef = useRef(false);
    const lastPosRef = useRef({ x: 0, y: 0 });
    const onSignatureChangeRef = useRef(onSignatureChange);
    
    // Keep ref updated
    useEffect(() => {
      onSignatureChangeRef.current = onSignatureChange;
    }, [onSignatureChange]);

    const setupCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }, []);

    const isCanvasEmpty = useCallback((): boolean => {
      const canvas = canvasRef.current;
      if (!canvas) return true;

      const ctx = canvas.getContext('2d');
      if (!ctx) return true;

      const pixelBuffer = new Uint32Array(
        ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
      );

      return !pixelBuffer.some((color) => color !== 0);
    }, []);

    const updateSignature = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const isEmpty = isCanvasEmpty();
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChangeRef.current?.(!isEmpty, dataUrl);
    }, [isCanvasEmpty]);

    const clear = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setupCanvas();
      onSignatureChangeRef.current?.(false, '');
    }, [setupCanvas]);

    useEffect(() => {
      setupCanvas();
      window.addEventListener('resize', setupCanvas);
      return () => window.removeEventListener('resize', setupCanvas);
    }, [setupCanvas]);

    useImperativeHandle(ref, () => ({
      clear,
      isEmpty: isCanvasEmpty,
      getDataUrl: () => canvasRef.current?.toDataURL('image/png') ?? '',
    }), [clear, isCanvasEmpty]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const getPosition = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
        const rect = canvas.getBoundingClientRect();
        let clientX: number, clientY: number;

        if ('touches' in e) {
          clientX = e.touches[0]?.clientX ?? 0;
          clientY = e.touches[0]?.clientY ?? 0;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        return {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      };

      const startDrawing = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        isDrawingRef.current = true;
        const pos = getPosition(e);
        lastPosRef.current = pos;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      };

      const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawingRef.current) return;
        e.preventDefault();

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const pos = getPosition(e);

        ctx.beginPath();
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();

        lastPosRef.current = pos;
      };

      const stopDrawing = () => {
        if (isDrawingRef.current) {
          isDrawingRef.current = false;
          updateSignature();
        }
      };

      const handleMouseDown = (e: MouseEvent) => startDrawing(e);
      const handleMouseMove = (e: MouseEvent) => draw(e);
      const handleMouseUp = () => stopDrawing();
      const handleMouseLeave = () => stopDrawing();

      const handleTouchStart = (e: TouchEvent) => startDrawing(e);
      const handleTouchMove = (e: TouchEvent) => draw(e);
      const handleTouchEnd = () => stopDrawing();

      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mouseleave', handleMouseLeave);

      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd);
      canvas.addEventListener('touchcancel', handleTouchEnd);

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mouseleave', handleMouseLeave);

        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        canvas.removeEventListener('touchcancel', handleTouchEnd);
      };
    }, [updateSignature]);

    return (
      <canvas
        ref={canvasRef}
        className={`touch-none select-none bg-white border border-slate-200 rounded-lg cursor-crosshair transition-all duration-200 hover:border-slate-300 focus:border-teal-500 ${className}`}
        style={{ width: '100%', height: '160px' }}
      />
    );
  }
);

SignatureCanvas.displayName = 'SignatureCanvas';

export default SignatureCanvas;
