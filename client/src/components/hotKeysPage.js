import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

class HotKeysPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchedColumn: "",
		};
		this.hotKeysList = [
			{
				key: "1",
				hotKey: "Shift + R",
				function: "Start New Game",
			},
			{
				key: "2",
				hotKey: "Shift + Q",
				function: "Leave Game",
			},
			{
				key: "3",
				hotKey: "Shift + Up",
				function: "Increase music Volume",
			},
			{
				key: "4",
				hotKey: "Shift + Down",
				function: "Decrease music Volume",
			},
			{
				key: "5",
				hotKey: "Ctrl + Up",
				function: "Increase sound Volume",
			},
			{
				key: "6",
				hotKey: "Ctrl + Down",
				function: "Decrease sound Volume",
			},
		];
	}

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => this.handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							this.setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex,
							});
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
				: "",
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select(), 100);
			}
		},
		render: (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	render() {
		const columns = [
			{
				title: "HotKey",
				dataIndex: "hotKey",
				key: "hotKey",
				width: "30%",
				...this.getColumnSearchProps("hotKey"),
			},
			{
				title: "Function",
				dataIndex: "function",
				key: "function",
				width: "20%",
				...this.getColumnSearchProps("function"),
			},
		];
		return <Table columns={columns} dataSource={this.hotKeysList} />;
	}
}

export default HotKeysPage;
