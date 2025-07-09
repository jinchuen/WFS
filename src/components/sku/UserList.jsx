import React, { useState, useCallback, useMemo, memo } from "react";

const UserItem = memo(({ user, onClick }) => {
  console.log("✅ 渲染 UserItem:", user.name);
  return (
    <div onClick={() => onClick(user)} className="p-2 border-b border-green-500 hover:bg-green-900">
      ✅ {user.name}
    </div>
  );
});

const UserItemNoCallback = memo(({ user, onClick }) => {
  console.log("❌ 渲染 UserItemNoCallback:", user.name);
  return (
    <div onClick={() => onClick(user)} className="p-2 border-b border-red-500 hover:bg-red-900">
      ❌ {user.name}
    </div>
  );
});

export default function CallbackComparisonDemo() {
  const [counter, setCounter] = useState(0);

  // ✅ useMemo 确保 users 引用不变
  const users = useMemo(
    () => [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" },
    ],
    [] // 空依赖，永不变
  );

  // ✅ 不依赖 counter，handleUserClick 永远不变
  const handleUserClick = useCallback((user) => {
    alert("✅ Clicked: " + user.name + "，当前 counter: " + counter);
	setCounter(counter)
  }, [counter]); // 👈 如果你加了 counter，这个函数会随着 counter 变而重新生成！

  // ❌ 每次 render 都是新函数（所以 memo 失效）
  const handleUserClickNoCallback = (user) => {
    alert("❌ Clicked: " + user.name + "，当前 counter: " + counter);
  };

  return (
    <div className="p-4 text-white">
      <button
        onClick={() => setCounter(counter + 1)}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        增加计数器 ({counter})
      </button>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-green-700 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">✅ 使用 useCallback</h3>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onClick={handleUserClick}
            />
          ))}
        </div>

        <div className="bg-red-700 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">❌ 不使用 useCallback</h3>
          {users.map((user) => (
            <UserItemNoCallback
              key={user.id}
              user={user}
              onClick={handleUserClickNoCallback}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
