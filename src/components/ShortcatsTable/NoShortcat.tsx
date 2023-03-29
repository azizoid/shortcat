import { Table } from "flowbite-react";

export const NoShortcat = () => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key="not-found">
  <Table.Cell className="whitespace-nowrap font-medium text-center text-gray-900 dark:text-white" colSpan={5}>
    Your list is empty Click
  </Table.Cell>
</Table.Row>