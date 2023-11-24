import RoundedSkeleton from "../skeleton/RoundedSkeleton";

const TableLoader = () => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <td className="px-3 py-1" colSpan={5}>
                        <RoundedSkeleton className="py-4" />
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                </tr>
                <tr>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                </tr>
                <tr>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                </tr>
                <tr>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                </tr>
                <tr>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                    <td className="px-3 py-3">
                        <RoundedSkeleton className="py-2" />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default TableLoader;