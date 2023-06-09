import { Shortcat } from "@prisma/client";
import { Table } from "flowbite-react";
import Link from "next/link";
import { NoShortcat } from "./NoShortcat";

type ShortcatsTableProps = {
  data: Shortcat[]
}
export const ShortcatsTable = ({ data }: ShortcatsTableProps) => <Table hoverable={true}>
  <Table.Head>
    <Table.HeadCell>
      GUID
    </Table.HeadCell>
    <Table.HeadCell>
      Redirect Url
    </Table.HeadCell>
    <Table.HeadCell>
      Status
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        View
      </span>
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Edit
      </span>
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">
    {data?.length === 0 && <NoShortcat />}

    {data?.map(shortcat =>
      <Table.Row className={`dark:border-gray-700 dark:bg-gray-800 ${shortcat.active ? 'bg-white' : 'bg-gray-50'}`} key={shortcat.id} >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {shortcat.shortcode_guid}
        </Table.Cell>
        <Table.Cell>
          {shortcat.redirect_url}
        </Table.Cell>
        <Table.Cell>
          {shortcat.active ? 'Active' : 'Inactive'}
        </Table.Cell>
        <Table.Cell>
          <Link href={`/${shortcat.shortcode_guid}`} >
            View
          </Link>
        </Table.Cell>
        <Table.Cell>
          <Link href={`/${shortcat.shortcode_guid}/edit`} >
            Edit
          </Link>
        </Table.Cell>
      </Table.Row>)}
  </Table.Body>
</Table >