import { Button } from "@repo/ui/components/button";

export type HeaderProps = {
  label?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export const Header = ({
  label = "Header",
  onCancel,
  onConfirm,
}: HeaderProps) => {
  return (
    <div className="flex justify-between p-1 items-center bg-primary text-primary-foreground select-none">
      <Button type="button" onClick={onCancel}>
        <span>&times;</span>
      </Button>
      <div className="overflow-hidden text-xl whitespace-nowrap overflow-ellipsis">
        {label}
      </div>
      <Button
        type="button"
        onClick={onConfirm}
        // TODO: disabled={!validation(inputValue)}>
      >
        <span>&crarr;</span>
      </Button>
    </div>
  );
};
