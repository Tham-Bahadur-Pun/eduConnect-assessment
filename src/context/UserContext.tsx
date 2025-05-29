import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
  useMemo,
} from "react";
import type { User, FilterOptions, SortConfig } from "../types";
import { userService } from "../services/userServices";

interface UserContextType {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: FilterOptions;
  sortConfig: SortConfig | undefined;
  pagination: {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
  fetchUsers: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setFilters: (filters: FilterOptions) => void;
  setSortConfig: (config: SortConfig | undefined) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  getCurrentPageUsers: () => User[];
  setFilteredUsers: (users: User[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    role: [],
    status: [],
  });
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getUsers();
      setUsers(data);
      setFilteredUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filtering, sorting, and search when dependencies change
  useEffect(() => {
    const applyFiltersAndSort = async () => {
      setLoading(true);
      try {
        const filtered = await userService.filterAndSortUsers(
          users,
          filters,
          sortConfig,
          searchTerm
        );
        setFilteredUsers(filtered);
        // Reset to first page when filters change
        setCurrentPage(1);
      } catch (err) {
        setError("Error applying filters");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (users.length > 0) {
      applyFiltersAndSort();
    }
  }, [searchTerm, filters, sortConfig, users]);

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getCurrentPageUsers = (): User[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const contextValue = useMemo(
    () => ({
      users,
      filteredUsers,
      loading,
      error,
      searchTerm,
      filters,
      sortConfig,
      pagination: {
        currentPage,
        totalPages,
        itemsPerPage,
      },
      fetchUsers,
      setSearchTerm,
      setFilters,
      setSortConfig,
      setCurrentPage,
      setItemsPerPage,
      getCurrentPageUsers,
      setFilteredUsers,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      searchTerm,
      filters,
      sortConfig,
      currentPage,
      fetchUsers,
      setSearchTerm,
      setFilters,
      setSortConfig,
      setCurrentPage,
      setItemsPerPage,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
