export default function InfoItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  );
}
