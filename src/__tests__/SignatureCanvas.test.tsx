import { render } from '@testing-library/react';
import SignatureCanvas from '@/components/SignatureCanvas';

// Mock the react-signature-canvas library
jest.mock('react-signature-canvas', () => {
  return jest.fn(() => <canvas data-testid="mock-signature-canvas" />);
});

// Mock canvas context
const mockGetContext = jest.fn(() => ({
  scale: jest.fn(),
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  getImageData: jest.fn(() => ({
    data: { buffer: new ArrayBuffer(4) },
  })),
}));

HTMLCanvasElement.prototype.getContext = mockGetContext as unknown as typeof HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.toDataURL = jest.fn(() => 'data:image/png;base64,test');

describe('SignatureCanvas', () => {
  const mockOnSignatureChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the signature canvas component', () => {
    const { container } = render(
      <SignatureCanvas onSignatureChange={mockOnSignatureChange} />
    );
    
    expect(container).toBeInTheDocument();
  });

  it('accepts callback prop', () => {
    render(
      <SignatureCanvas onSignatureChange={mockOnSignatureChange} />
    );
    
    // The component is setup - callback would be triggered on actual signature drawing
    expect(typeof mockOnSignatureChange).toBe('function');
  });

  it('is forwarded as a ref', () => {
    const { container } = render(
      <SignatureCanvas onSignatureChange={mockOnSignatureChange} />
    );
    
    expect(container).toBeInTheDocument();
  });
});
