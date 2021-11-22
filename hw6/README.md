# wp1101 hw6
## tic-tac-toe game
這個圈圈叉叉遊戲是由前端 (React.js + Axios.js) 跟後端 (express.js) 組成
### How to run?
1. 安裝node_modules:
    * 於`/hw6/`目錄下在terminal輸入`npm install`
2. 把前端跑起來:
    * 於`/hw6/`目錄下在terminal輸入`npm start`
    * 前往[http://localhost:3000](http://localhost:3000)就可以找到圈圈叉叉遊戲
3. 把後端跑起來:
    * 開啟另一個terminal
    * 於`/hw6/`目錄下在terminal輸入`npm run server`

### How to play
在前端的九宮格中點選你要下的位置，後端會回傳電腦選擇的位置\
玩家為O，電腦則為X
當前端重新整理時，遊戲進度*不會消失*，所以不能看到快要輸給電腦了就重新整理XDDD\
如果遊戲中途server斷線遊戲會出現警訊，而server回來後遊戲會重新開始\
祝玩得愉快!!!
