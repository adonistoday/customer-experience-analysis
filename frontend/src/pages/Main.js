import axios from "axios";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, Col, Layout, Menu, Row } from "antd";
import ReactApexChart from "react-apexcharts";
import RecordItem from "../components/RecordItem";
import ListItem from "../components/ListItem";
import TimeLine from "../components/TimeLine";
import AudioPlayer from "../components/audioplayer";
import tracks from "../tracks";
import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import LineChart from "../components/linechart";
import Accordion from "../components/Accordion";
import mockData from "../tracks";
const { Header, Sider, Content } = Layout;
const gridStyle = {
  width: "100%",
};

export default function MainPage() {
  const [data, setData] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [audiofile, setAudiofile] = useState(null);
  const [chartdata,setchartdata]=useState([]);

  const [track, setTrack] = useState(mockData[0]);

  const chartOptions = {
    // Configuration options
    chart: {
      type: "pie",
    },
    series: [dataItem.negative, dataItem.positive],
    labels: ["Negative", "Positive"],
    colors: ["#FB36F4", "#1FC5A8"],
    legend: {
      show: true,
    },
  };

  const handleClick = (item) => {
    setDataItem(item);
    setAudiofile(item.fileName);
    // TODO: set track with axios data
    setTrack(mockData.filter((element) => element.title === item.fileName)[0]);
    console.log(item);
    setchartdata(item.transcription);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/data")
      .then((res) => 
      {
        setData(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout className="h-screen">
      <Sider className="bg-gradient-to-br from-my-from-color to-my-to-color">

        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["2"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header>
          <HeaderBar />
        </Header>
        <Content
          style={{
            padding: 24,
          }}
          className="relative"
        >
          <Row gutter={50}>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={8}
              style={{
                height: "500px",
                overflow: "auto",
              }}
            >
              <Card title="Records" bordered={true}>
                {data.map((item, index) => (
                  <Card.Grid
                    key={index}
                    style={gridStyle}
                    className={index === selectedItem ? "selected" : ""}
                    onClick={() => {
                      handleClick(item);
                      setSelectedItem(index);
                    }}
                  >
                    <ListItem data={item} />
                  </Card.Grid>
                ))}
              </Card>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={8}
              style={{
                height: "500px",
                overflow: "auto",
              }}
            >
              <RecordItem data={dataItem} />
            </Col>
            <Col
              className="pl-20"
              xs={24}
              sm={24}
              md={24}
              lg={8}
              style={{ height: "500px", overflow: "auto" }}
            >
              {/* <ReactApexChart
                options={chartOptions}
                series={chartOptions.series}
                type="pie"
                height={150}
              /> */}
              {/* <div
                className={
                  dataItem.positive
                    ? "pl-4 mt-14 text-4xl text-positive-color"
                    : "pl-4 mt-14 text-4xl text-negative-color"
                }
              >
                {dataItem.positive > dataItem.negative
                  ? "This call is POSITIVE!"
                  : dataItem.positive < dataItem.negative
                  ? "This call is negative!"
                  : ""}
              </div> */}
              <AudioPlayer track={track} />
              <LineChart chartdata={chartdata}/>
            </Col>
          </Row>

          {/* <Accordion data={dataItem} /> */}
        </Content>
        {dataItem!=[]&&<Accordion data={dataItem} />}
        {/* <TimeLine data={dataItem} /> */}
      </Layout>
    </Layout>
  );
}
