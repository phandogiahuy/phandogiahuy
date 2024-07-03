import { SwapOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Space } from "antd";
import { dataCurrency } from "../data/currency.ts";
import { useState } from "react";
import { convertAmoundSendtoAmountReceived } from "../utils/convertAmount.ts";
const FormComponent = () => {
  const [amountUnit, setAmountUnit] = useState<{ value: string; unit: string }>(
    {
      value: "",
      unit: dataCurrency[0].currency,
    }
  );
  const [unitReceive, setUnitReceive] = useState<string>("");
  const [isSend, setSend] = useState(false);
  const [swaped, setSwaped] = useState(false);

  
  // Converted the amount to send to amount to received
  const convertAmountSendToReceived = convertAmoundSendtoAmountReceived(
    amountUnit,
    unitReceive
  );
  const submitSwap = () => {
    setSend(true);
    setTimeout(() => {
      setSend(false);
      setSwaped(true);
      message.success("Successful Swap");
    }, 1000);
  };
  return (
    <div className="mt-20 bg-gradient-to-r animate-ping from-slate-900  to-slate-700 h-[300px] flex justify-center items-center rounded-xl w-2/6   shadow-[-19px_3px_41px_23px_#903396BF]">
      <Form
        layout="horizontal"
        style={{ maxWidth: "600px", minWidth: "300px" }}
        size="large"
        onFinish={submitSwap}
      >
        <Form.Item
          name="amountSend"
          label={
            <p
              style={{
                fontSize: "20px",
                fontFamily: "serif",
                color: "antiquewhite",
              }}
            >
              Amount to send
            </p>
          }
          colon={false}
          rules={[
            { required: true, message: "Please enter a covert ammount" },
            {
              min: 1,
              message: "Amount must be a positive number",
            },
          ]}
        >
          <Space>
            <Input
              placeholder="Amount to send"
              style={{ marginLeft: "7px" }}
              type="number"
              min={0}
              value={amountUnit.value}
              onChange={(e) =>
                setAmountUnit((state) => ({
                  ...state,
                  value: e.target.value,
                }))
              }
            />
            <Select
              defaultValue={dataCurrency[0].currency}
              options={dataCurrency.map((currency) => ({
                value: currency.currency,
                label: (
                  <Space>
                    <img
                      src={currency.url}
                      style={{
                        width: "25px",
                        marginRight: "8px",
                        marginTop: "5px",
                      }}
                    />
                    {currency.currency}
                  </Space>
                ),
              }))}
              style={{ width: "130px", marginLeft: "7px" }}
              onChange={(e) =>
                setAmountUnit((state) => ({ ...state, unit: e }))
              }
            />
          </Space>
        </Form.Item>
        <Form.Item
          name="amountReceive"
          label={
            <p
              style={{
                fontSize: "20px",
                fontFamily: "serif",
                color: "antiquewhite",
              }}
            >
              Amount to receive
            </p>
          }
          colon={false}
        >
          <Space>
            <Input
              placeholder="Amount to received"
              value={unitReceive && convertAmountSendToReceived}
            />
            <Select
              options={dataCurrency.map((currency) => ({
                value: currency.currency,
                label: (
                  <Space>
                    <img
                      src={currency.url}
                      style={{
                        width: "25px",
                        marginRight: "5px",
                        marginTop: "5px",
                      }}
                    />
                    {currency.currency}
                  </Space>
                ),
              }))}
              style={{ width: "130px", marginLeft: "2px" }}
              placeholder="Select token"
              value={unitReceive}
              onChange={(e) => setUnitReceive(e)}
            />
          </Space>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "200px" }}
            loading={isSend}
          >
            <SwapOutlined /> Swap
          </Button>
        </Form.Item>
        {swaped && (
          <p className="text-slate-100 text-xl font-serif">{`You receive ${convertAmountSendToReceived} ${unitReceive} `}</p>
        )}
      </Form>
    </div>
  );
};

export default FormComponent;
