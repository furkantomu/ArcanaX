import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../Button';

// Mock haptic feedback
jest.mock('@/utils', () => ({
  useHaptic: () => jest.fn(),
  useScaleAnimation: () => ({
    handlers: {},
    animatedStyle: {},
  }),
}));

describe('Button Component', () => {
  it('should render correctly with text', () => {
    const {getByText} = render(<Button text="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const mockPress = jest.fn();
    const {getByRole} = render(
      <Button text="Test Button" handlePress={mockPress} />
    );
    
    fireEvent.press(getByRole('button'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const mockPress = jest.fn();
    const {getByRole} = render(
      <Button text="Test Button" handlePress={mockPress} disabled />
    );
    
    fireEvent.press(getByRole('button'));
    expect(mockPress).not.toHaveBeenCalled();
  });

  it('should apply primary variant styles by default', () => {
    const {getByRole} = render(<Button text="Test Button" />);
    const button = getByRole('button');
    expect(button.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: '#1E40AF',
      })
    );
  });

  it('should apply secondary variant styles when specified', () => {
    const {getByRole} = render(
      <Button text="Test Button" variant="secondary" />
    );
    const button = getByRole('button');
    expect(button.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: '#F9FAFB',
      })
    );
  });
});