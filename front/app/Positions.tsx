import { PropsWithChildren } from "react";

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function Positions(props: Props) {
  return (
    <div className="p-4 md:p-0">
      <div className="flex space-x-2 mt-4">
        <button className="bg-[#F3C5FF] px-4 py-2 rounded-full">
          Positions
        </button>
      </div>
      <div className="w-full overflow-auto mt-2 rounded-md">
        <table className="table-auto bg-[#F3C5FF] w-full text-gray-600 text-sm">
          <thead className="p-4">
            <tr className="p-4 border-b-2">
              <th className="p-4">Contracts</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Value</th>
              <th className="p-4">Entry Price</th>
              <th className="p-4">Mark Price</th>
              <th className="p-4">Liq. Price</th>
              <th className="p-4">Collateral</th>
              <th className="p-4">Borrowed</th>
              <th className="p-4">Unrealized P&L(ROI) </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
