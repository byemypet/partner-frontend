import {
  UserOutlined,
  AccountBookOutlined,
  BellOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  MenuProps,
  Popover,
  Space,
  Typography,
} from "antd";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { createElement } from "react";

const { Header, Content, Footer, Sider } = Layout;

interface IBasicLayoutProps {
  children: React.ReactNode;
}
interface IBreadcrumbNameMap {
  [index: string]: string;
}
const breadcrumbNameMap: IBreadcrumbNameMap = {
  "/schedules": "예약관리",
  "/schedules/real-time-schedules": "실시간 예약관리",
  "/revenue": "수익관리",
  "/site": "사이트 관리",
  "/notify": "알림 관리",
} as const;

function BasicLayout({ children }: IBasicLayoutProps) {
  const router = useRouter();
  const { pathname } = router;

  const pathSnippets = pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>{breadcrumbNameMap[url]}</Breadcrumb.Item>
    );
  });

  const items: MenuProps["items"] = [
    {
      key: "/schedules",
      icon: createElement(UserOutlined),
      label: breadcrumbNameMap["/schedules"],
      children: [
        {
          key: "/schedules/real-time-schedules",
          label: breadcrumbNameMap["/schedules/real-time-schedules"],
          onClick: () => router.push("/schedules/real-time-schedules"),
        },
      ],
    },
    {
      key: "/revenue",
      icon: createElement(AccountBookOutlined),
      label: breadcrumbNameMap["/revenue"],
      onClick: () => router.push("/revenue"),
    },
    {
      key: "/site",
      icon: createElement(FileTextOutlined),
      label: breadcrumbNameMap["/site"],
      onClick: () => router.push("/site"),
    },
    {
      key: "/notify",
      icon: createElement(BellOutlined),
      label: breadcrumbNameMap["/notify"],
      onClick: () => router.push("/notify"),
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          바이마이펫 Partner's Page
        </div>
        <Menu
          selectedKeys={[pathname]}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          style={{
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "fixed",
            width: "calc(100vw - 200px)",
          }}
        >
          <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb>
          <Popover content={<Button>로그아웃</Button>} trigger="hover">
            <Space
              style={{
                cursor: "pointer",
              }}
            >
              <Avatar size="small" icon={<UserOutlined />} />
              <Typography.Text>윤이찬미님</Typography.Text>
            </Space>
          </Popover>
        </Header>
        <Content style={{ margin: "80px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: "#fff",
              minHeight: "calc(100vh - 64px - 152px - 18px)",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "20px",
            letterSpacing: "-0.2px",
            color: "rgb(126, 128, 130)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Space
            style={{
              fontWeight: 500,
            }}
          >
            (주)바이마이펫
          </Space>
          <Space>
            <span>대표이사: 박종하</span>
            <span>|</span>
            <span>
              사업자등록번호: 120-87-65763{" "}
              <Button size="small" type="link">
                사업자정보확인
              </Button>
            </span>
            <span>|</span>
            <span>주소 : 서울 서초구 00대로 2, 00빌딩 1층</span>
          </Space>
          <Space>
            <span>대표전화: 010-0000-0000</span>
            <span>|</span>
            <span>대표메일: byemypet@gmail.com</span>
          </Space>
          <Space
            style={{
              marginTop: "20px",
            }}
          >
            © ByeMyPet Corp.
          </Space>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
