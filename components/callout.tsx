import { Info, Lightbulb, CheckCircle2, AlertTriangle, AlertOctagon, Star } from 'lucide-react';

export type CalloutVariant = 'info' | 'tip' | 'important' | 'warning' | 'danger' | 'success';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

export function Callout({
  variant = 'info',
  title,
  children
}: CalloutProps) {
  const fallback = title ?? variant[0].toUpperCase() + variant.slice(1);
  
  const icons: Record<CalloutVariant, React.ReactNode> = {
    info: <Info size={20} />,
    tip: <Lightbulb size={20} />,
    important: <Star size={20} />,
    warning: <AlertTriangle size={20} />,
    danger: <AlertOctagon size={20} />,
    success: <CheckCircle2 size={20} />
  };

  return (
    <aside className="callout" data-variant={variant} role="note">
      <div className="callout__icon" aria-hidden="true">
        {icons[variant]}
      </div>
      <p className="callout__title">{fallback}</p>
      <div className="callout__body">{children}</div>
    </aside>
  );
}