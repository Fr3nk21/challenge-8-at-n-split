import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );

  // return (
  //   <div>
  //     <ul>
  //       <li>
  //         <Friend
  //           id={data.id}
  //           name={data.name}
  //           image={data.image}
  //           balance={data.balance}
  //         />
  //       </li>
  //     </ul>
  //   </div>
  // );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
  // return (
  //   <>
  //     {initialFriends.map(function (data) {
  //       return (
  //         <div key={data.id}>
  //           <img src={data.image} alt="profile" />
  //           <h3>{data.name}</h3>
  //           <p>Balance: {data.balance}</p>
  //           <button className="button">Select</button>
  //         </div>
  //       );
  //     })}
  //   </>
  // );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );

  // return (
  //   <div>
  //     <ul>
  //       <li>
  //         <label>Friend name</label>
  //         <input type="text"></input>
  //       </li>
  //       <li>
  //         <label>Image URL</label>
  //         <input type="text"></input>
  //       </li>
  //       <button className="button">Add</button>
  //     </ul>
  //   </div>
  // );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🧍‍♀️ Your expense</label>
      <input type="text" />

      <label>👬 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="Friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
  // return (
  //   <div>
  //     <h2>Split a bill with sarah</h2>
  //     <div>
  //       <label>Bill value</label>
  //       <input type="number"></input>
  //     </div>
  //     <div>
  //       <label>Your expense</label>
  //       <input type="number"></input>
  //     </div>
  //     <div>
  //       <label>Sarah's expense</label>
  //       <input type="number"></input>
  //     </div>
  //     <div>
  //       <label>Who is paying the bill?</label>
  //       <select>
  //         <option value="1"></option>
  //         <option value="2"></option>
  //         <option value="3"></option>
  //       </select>
  //     </div>
  //     <button className="button">Split bill</button>
  //   </div>
  // );
}
