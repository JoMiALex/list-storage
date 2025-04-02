'use client'
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDoc, querySnapshot, query, onSnapshot,deleteDoc, doc} from "firebase/firestore";
import { db } from './cfirebase';

export default function Home() {
  const [items, setItems] = useState([
    // { name: 'Icee', price: 8.00 },
    // { name: 'Movie Ticket', price: 15.80 },
    // { name: 'Protein Bar', price: 3.99 }
  ]);
  const [newItem, setNewItem] = useState({name:'', price:''});
  const [total, setTotal] = useState(0);

  //Add items to database
  const createItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      //Test setItems([...items, newItem]);
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({ name: '', price: '' });
    }
    /*
    const name = e.target[0].value;
    const price = e.target[1].value;
    const newItem = { name, price: parseFloat(price) };
    setItems([...items, newItem]);
    e.target[0].value = '';
    e.target[1].value = '';
    */
  };

  //Read items from database //TODO:  Fix this
  useEffect(() => {
    // const newTotal = items.reduce((acc, item) => acc + item.price, 0);
    // setTotal(newTotal);
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      //Calculate total
      const newTotal = itemsArr.reduce((acc, item) => acc + item.price, 0);
      setTotal(newTotal);
      return () => unsubscribe();
    });
  }, [items]);

  //Delete items from database
  const handleDelete = async (index) => {
    await deleteDoc(doc(db, 'items', index));
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
        <div className="z-10 w-full max-w-5xl items-center justify-bwtweeen font-mono text-sm">
          <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
          <div className='bg-slate-800 p-4 rounded-lg'>
            <form className='grid grid-cols-6 items-center text-black'>
              <input
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value })}
                className='col-span-3 p-3 border'
                type='text'
                placeholder='Enter Item'
              />
              <input 
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) })}
                className='col-span-2 p-3 border mx-3'
                type='number'
                placeholder='Enter $'
              />
              <button
                onClick={createItem}
                className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'
                type='submit'
              >
                Add
              </button>
            </form>
            <ul>
              {items.map((item, id) => (
                <li key={id} className='my-4 w-full flex justify-between bg-slate-950'>
                  <div className='p-4 w-full flex justify-between'>
                    <span className='capitalize'>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                  <button onClick={handleDelete(item.id)} className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 text-sm'>
                    X
                  </button>
                </li>
              ))}
            </ul>
            {items.length< 1 ? ('') : (
              <div className='flex justify-between p-3'>
                <span>Total</span>
                <span>${total}</span>
              </div>
            )}
          </div>
        </div>
      </main>
  );
}
