import { useUsers } from '../../context/UserContext';
import type { SortConfig, User } from '../../types';
import { UserFilter } from '../../components/users/UserFilter';
import { UserTable } from '../../components/users/UserTable';
import { Pagination } from '../../components/ui/Pagination';
import { SearchBar } from '../../components/ui/SearchBar';

const ListUsers = () => {
  const { searchTerm, setSearchTerm } = useUsers();

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

  const users = getCurrentPageUsers();

  const handleSort = (key: keyof User) => {
    const newConfig: SortConfig =
      sortConfig?.key === key
        ? { key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' };
    setSortConfig(newConfig);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Users
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name or email..."
        />
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
