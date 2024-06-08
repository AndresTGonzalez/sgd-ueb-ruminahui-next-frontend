// Capitalize the first letter of a string
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateToEcuadorian(date: Date | string) {
  const d = new Date(date);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son de 0-11
  const year = d.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
