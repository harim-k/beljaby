import React from 'react';
import './TottoForm.css';
import { Typography, Form, Button, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { Totto } from "../../../../api/beljabi"


type TottoFormProps = {
  onSubmitTotto: (totto: Totto) => void;
};

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { offset: 0, span: 0},
};


function TottoForm({ onSubmitTotto }: TottoFormProps) {
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();
  
  const onFinish = (values: Totto) => {
    console.log('Received values of form:', values);
    onSubmitTotto(values);
  };
 
  return (
    <>
    <Title level={3} style={{alignSelf:"center", margin: "10px"}}> CREATE TOTTO </Title>
    <Form ref={formRef}form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="tottos">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                <Form.Item
                  {...field}
                  label="Question"
                  name={[field.name, 'title']}
                  fieldKey={[field.fieldKey, 'title']}
                  style={{width:"800px"}}
                  rules={[{ required: true, message: 'Missing' }]}
                >
                  <Input />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}

            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Totto
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default TottoForm;