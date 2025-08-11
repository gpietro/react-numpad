# Using Effector Model with React NumPad

The NumPad component now uses Effector for state management, providing better separation of concerns between the model (state logic) and view (component).

## Basic Usage

The component works exactly as before:

```tsx
import NumPad from 'react-numpad';

<NumPad.Number 
  value={value}
  onChange={setValue}
  onClickOutside="accept" // or "cancel"
/>
```

## Advanced Usage with Effector Model

You can access and control the NumPad state directly using the Effector model:

```tsx
import { NumPadModel } from 'react-numpad';
import { useUnit } from 'effector-react';

function MyComponent() {
  // Access the state
  const { show, value, initialValue } = useUnit(NumPadModel.$numPadState);
  
  // Control the numpad programmatically
  const handleOpenNumPad = () => {
    NumPadModel.openKeyPad();
  };
  
  const handleCloseNumPad = () => {
    NumPadModel.closeKeyPad();
  };
  
  const handleUpdateValue = (newValue: string) => {
    NumPadModel.updateValue(newValue);
  };
  
  return (
    <div>
      <p>NumPad is {show ? 'open' : 'closed'}</p>
      <p>Current value: {value}</p>
      <button onClick={handleOpenNumPad}>Open NumPad</button>
      <button onClick={handleCloseNumPad}>Close NumPad</button>
    </div>
  );
}
```

## Available Events

- `NumPadModel.openKeyPad()` - Opens the numpad
- `NumPadModel.closeKeyPad()` - Closes the numpad
- `NumPadModel.toggleKeyPad()` - Toggles the numpad state
- `NumPadModel.updateValue(value: string)` - Updates the current value
- `NumPadModel.setValue(value: string)` - Sets the value directly
- `NumPadModel.setInitialValue(value: string)` - Sets the initial value
- `NumPadModel.handleClickOutside(params)` - Handles click outside behavior

## Available Stores

- `NumPadModel.$show` - Boolean store for numpad visibility
- `NumPadModel.$value` - String store for current value
- `NumPadModel.$initialValue` - String store for initial value
- `NumPadModel.$preValue` - Store for previous value
- `NumPadModel.$numPadState` - Combined state store

## Effects

- `NumPadModel.confirmValueFx` - Effect for confirming a value
- `NumPadModel.syncValueFx` - Effect for syncing values

This architecture provides better testability, reusability, and separation of concerns while maintaining the same API for regular usage.
