import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import './App.css';
import CarCard from './components/CarCard';

export interface CarI {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

interface SelectItemI {
  value: string;
  label: string;
}

const selectData: SelectItemI[] = [
  {
    value: 'cheap',
    label: 'Сначала дешевле',
  },
  {
    value: 'expensive',
    label: 'Сначала дороже',
  },
  {
    value: 'new',
    label: 'По году: новее',
  },
  {
    value: 'old',
    label: 'По году: старше',
  },
];

const comparativeFunction = (sortOption: string) => {
  switch (sortOption) {
    case 'cheap':
      return (a: CarI, b: CarI) => a.price - b.price;
    case 'expensive':
      return (a: CarI, b: CarI) => b.price - a.price;
    case 'new':
      return (a: CarI, b: CarI) => b.year - a.year;
    case 'old':
      return (a: CarI, b: CarI) => a.year - b.year;
    default:
      return () => 0;
  }
};

function App() {
  const [cars, setCars] = useState<CarI[]>([]);
  const [sortType, setSortType] = useState<string>(selectData[0].value);

  const editHandler = (editCar: CarI): void => {
    setCars((prev) =>
      prev.map((car) => (car.id === editCar.id ? editCar : car))
    );
  };

  const deleteHandler = (id: number): void => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const sortedCars = useMemo(() => {
    const comparator = comparativeFunction(sortType);
    return [...cars].sort(comparator);
  }, [sortType, cars]);

  useEffect(() => {
    axios.get('https://test.tspb.su/test-task/vehicles').then((response) => {
      setCars(response.data);
      console.log('cars', response.data);
    });
  }, []);

  return (
    <>
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        {selectData.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className={'car-list'}>
        {sortedCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </>
  );
}

export default App;
