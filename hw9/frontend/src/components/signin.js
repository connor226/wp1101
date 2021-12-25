import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import displayStatus from "../utils/displayStatus";

export default function SignIn({ username, setName, setSignedIn }){
    return (
        <div className="App">
            <div className="App-title">
                <h1>Simple Chat</h1>
            </div>
            <Input.Search 
                prefix={<UserOutlined />}
                value={username} enterButton="Sign in"
                onChange={(e) => setName(e.target.value)}
                placeholder={"Enter your name"}
                size="large" style={{ width: 300, margin: 50 }}
                onSearch={() => {
                    if(!username)  displayStatus({ type: 'error', msg: 'Missing username' });
                    else  setSignedIn(true);
                }}
            />
        </div>
    )
}