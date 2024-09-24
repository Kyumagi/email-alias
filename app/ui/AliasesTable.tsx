import { getAllAliasesByEmail } from "@/app/api/cloudflare";
import DeleteAliasButton from "./DeleteAliasButton";

export default async function AliasesTable({ userEmail }: { userEmail: string }) {
  const aliases = await getAllAliasesByEmail(userEmail as string);
  
  if (aliases.status === 0) {
    console.error(aliases);
    return <p>Failed to get aliases.</p>;
  }

  return (
    <table className="w-full table-auto rounded-xl bg-gray-100 shadow-sm">
      <thead></thead>
      <tbody>
        {/* Generate a row for each alias */}
        {aliases.aliases.map(({ alias }: { alias: string }) => (
          <tr key={alias} className="group">
            <td className="flex justify-between border-b border-gray-200 p-3 group-last:border-b-0">
              <div>{alias}</div>

              {/* Delete button */}
              <div>
                <DeleteAliasButton alias={alias} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
