import React from 'react';
import Link from 'next/link';

interface DashboardCardProps {
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function DashboardCard({
  title,
  description,
  href,
  onClick,
  icon,
}: DashboardCardProps) {
  const content = (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {description && <p className="mt-2 text-gray-600">{description}</p>}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="cursor-pointer text-left">
        {content}
      </button>
    );
  }

  return content;
}
