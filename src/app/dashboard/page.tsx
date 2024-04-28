
"use client"
import Cryptocurrencies from "@/components/Cryptocurrencies";
import Loading from "@/components/Loaidng";
import { useGetCryptosQuery } from "@/services/cryptoApi";
import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import Link from "next/link";

type HomeProps = {};

const { Title } = Typography;

export default function Page() {

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalData = data?.data?.stats;
  if (isFetching) return <Loading />;

    return (
      <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Total Crypto Currencies" value={globalData.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Crypto Exchanges"
            value={millify(globalData.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalData.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalData.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalData.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link href="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      </>
    )
  }