import type { FC } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import type { SearchProps } from "antd/es/input";

import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useSearch } from "../../hooks/use-search";
import { AlertsSearchFilterDrawer } from "../../modals/alerts-search-filter-drawer";
import { setShowEventsFilterModal } from "../../store/slices/events";

import styles from "./index.module.css";

const { Search } = Input;

export const AlarmRecordGridSearch: FC = () => {
  const dispatch = useAppDispatch();
  const { initialValue, onClear, onSearch } = useSearch();

  const handleSearch: SearchProps["onSearch"] = (value, _event, info) => {
    if (info?.source === "clear") {
      onClear();
    } else if (info?.source === "input") {
      onSearch(value);
    }
  };

  const handleFilterClick = () => {
    dispatch(setShowEventsFilterModal(true));
  };

  return (
    <>
      <div className={styles.container} data-testid="alarm-record-grid-search">
        <Search
          role="search"
          size="large"
          placeholder="Enter Keyword"
          allowClear={true}
          title="Enter the keyword and press Enter"
          maxLength={255}
          onSearch={handleSearch}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          defaultValue={initialValue}
        />

        <Button
          size="large"
          icon={<FilterOutlined />}
          onClick={handleFilterClick}
        >
          Filter
        </Button>
      </div>

      <AlertsSearchFilterDrawer />
    </>
  );
};
