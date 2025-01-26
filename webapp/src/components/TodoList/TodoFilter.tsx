import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TaskStatus } from "@/types/todo";

interface IProps {
  filters: {
    status: TaskStatus | null;
    search: string;
  };
  setFilters: (filters: { status: TaskStatus | null; search: string }) => void;
}

export default function TodoFilter({ filters, setFilters }: IProps) {
  return (
    <>
      <Input
        placeholder="Search Task..."
        className="w-80"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <Select
        value={
          typeof filters.status === "number" ? filters.status.toString() : "all"
        }
        onValueChange={(value) => {
          setFilters({
            ...filters,
            status: value === "all" ? null : (Number(value) as TaskStatus),
          });
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">Pending</SelectItem>
            <SelectItem value="1">Done</SelectItem>
            <SelectItem value="2">Archived</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
