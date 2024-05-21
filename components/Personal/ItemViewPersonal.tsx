function ItemViewPersonal({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm">{label}</label>
      <p>{value}</p>
    </div>
  );
}

export { ItemViewPersonal };
