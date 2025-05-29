import React from "react";

import type { FilterOptions } from "../../types";
import { FilterSelect } from "../ui/FilterSelect";

interface UserFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const UserFilter: React.FC<UserFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleRoleFilterChange = (selectedRoles: string[]) => {
    onFilterChange({
      ...filters,
      role: selectedRoles,
    });
  };

  const handleStatusFilterChange = (selectedStatuses: string[]) => {
    onFilterChange({
      ...filters,
      status: selectedStatuses,
    });
  };

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "user", label: "User" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      <FilterSelect
        title="Role"
        options={roleOptions}
        selectedValues={filters.role}
        onChange={handleRoleFilterChange}
      />

      <FilterSelect
        title="Status"
        options={statusOptions}
        selectedValues={filters.status}
        onChange={handleStatusFilterChange}
      />
    </div>
  );
};
