import { Button } from '@repo/ui/components/button';

export type HeaderProps = {
  label?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export const Header = ({
  label = 'Header',
  onCancel,
  onConfirm,
}: HeaderProps) => {
  return (
    <div className="flex select-none items-center justify-between bg-primary p-1 text-primary-foreground">
      <Button onClick={onCancel} type="button">
        <span>&times;</span>
      </Button>
      <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xl">
        {label}
      </div>
      <Button
        onClick={onConfirm}
        type="button"
        // TODO: disabled={!validation(inputValue)}>
      >
        <span>&crarr;</span>
      </Button>
    </div>
  );
};
