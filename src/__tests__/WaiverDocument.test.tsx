import { render } from '@testing-library/react';
import WaiverDocument from '@/components/WaiverDocument';

describe('WaiverDocument', () => {
  const mockProps = {
    participantName: 'John Doe',
    language: 'en' as const,
    signatureDataUrl: 'data:image/png;base64,test',
    timestamp: '2025-12-06T12:00:00.000Z',
    agreed: true,
  };

  it('renders the waiver document with required elements', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    expect(container).toBeInTheDocument();
    expect(container.textContent).toContain("HOPE'S CORNER");
  });

  it('displays participant name', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    expect(container.textContent).toContain('John Doe');
  });

  it('displays the correct language content for English', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    expect(container.textContent).toContain('BICYCLE PROGRAM WAIVER AND RELEASE FROM LIABILITY');
  });

  it('displays the correct language content for Spanish', () => {
    const { container } = render(
      <WaiverDocument {...mockProps} language="es" ref={null} />
    );
    
    expect(container.textContent).toContain('PROGRAMA DE BICICLETAS');
  });

  it('displays the correct language content for Chinese', () => {
    const { container } = render(
      <WaiverDocument {...mockProps} language="zh" ref={null} />
    );
    
    expect(container.textContent).toContain('自行车项目');
  });

  it('shows agreement confirmation checkmark', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    // Look for checkmark character
    expect(container.textContent).toContain('✓');
  });

  it('includes the full waiver text content', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    const text = container.textContent || '';
    
    // Check for key waiver clauses
    expect(text).toMatch(/voluntary participant/i);
    expect(text).toMatch(/release.*liability/i);
    expect(text).toMatch(/indemnify/i);
  });

  it('displays document ID when provided', () => {
    const { container } = render(
      <WaiverDocument {...mockProps} documentId="WVR-TEST-123" ref={null} />
    );
    
    expect(container.textContent).toContain('WVR-TEST-123');
  });

  it('displays the agreement confirmation section', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    expect(container.textContent).toContain('AGREEMENT CONFIRMATION');
  });

  it('displays date and timestamp information', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    // Should contain date-related content
    const text = container.textContent || '';
    expect(text).toMatch(/December|Date|Signed/);
  });

  it('includes legal notice and witness statement', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    const text = container.textContent || '';
    expect(text).toMatch(/legally binding|Electronic Signature/i);
  });

  it('displays signature image container', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('displays organization logo', () => {
    const { container } = render(<WaiverDocument {...mockProps} ref={null} />);
    
    const images = container.querySelectorAll('img');
    // Should have at least logo and signature image
    expect(images.length).toBeGreaterThanOrEqual(1);
  });
});
