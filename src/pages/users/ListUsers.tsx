import { useUsers } from "../../context/UserContext";
import type { User } from "../../types";
import { UserFilter } from "../../components/users/UserFilter";
import { UserTable } from "../../components/users/UserTable";
import { Pagination } from "../../components/ui/Pagination";

const ListUsers = () => {
  const {
    loading,
    filters,
    setFilters,
    sortConfig,
    setSortConfig,
    pagination,
    setCurrentPage,
    getCurrentPageUsers,
  } = useUsers();

  const handleSort = (key: keyof User) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return {
        key,
        direction: "asc",
      };
    });
  };

  const users = getCurrentPageUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Users
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <UserFilter filters={filters} onFilterChange={setFilters} />
      </div>

      <UserTable
        users={users}
        loading={loading}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ListUsers;
