"use client"
import { useGetCryptosQuery } from "@/services/cryptoApi";
import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import Link from "next/link";
import React, { useEffect } from "react";
import Loading from "./Loaidng";
type CryptocurrenciesProps = {
  simplified?: boolean;
};

export interface Currency {
  uuid: any;
  name: string;
  rank: number;
  iconUrl: string;
  price: number;
  marketCap: number;
  change: number;
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins ?? []);

    const filteredList = cryptoList?.data?.coins?.filter((item: any) =>
      item?.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredList);
  }, [cryptoList, searchTerm]);

  console.log(cryptoList);

  if (isFetching) return <Loading />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: Currency) => (
          <Col className="crypto-card" xs={24} lg={6} key={currency.uuid}>
            <Link href={`/dashboard/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} style={{width: '40px', }}/>}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Price: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change * 10)} %</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default Cryptocurrencies;
