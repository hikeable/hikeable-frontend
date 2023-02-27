import Link from "next/link";

export function PrefList(props) {
  const { data } = props;

  return (
    <ul>
      {data.map((pref) => (
        <li key={pref}>
          <Link href={`/trails/${pref.toLowerCase()}`}>{pref}</Link>
        </li>
      ))}
    </ul>
  );
}
