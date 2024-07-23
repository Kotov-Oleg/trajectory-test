import React, { FC, useState } from 'react';

import './CarCard.css';

import { CarI } from '../App';

interface CarCardI {
  car: CarI;
  editHandler: (car: CarI) => void;
  deleteHandler: (id: number) => void;
}

const CarCard: FC<CarCardI> = ({ car, editHandler, deleteHandler }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formState, setFormState] = useState<CarI>(car);

  const isEditHandler = () => {
    setIsEdit((prev) => !prev);
    const validateFormState: CarI = {
      ...formState,
      year: formState.year ? formState.year : car.year,
      price: formState.price ? formState.price : car.price,
    };
    setFormState(validateFormState);
    editHandler(validateFormState);
  };

  return (
    <div className={'car-card'}>
      <div className={'btn-container'}>
        <button className={'edit-btn'} onClick={isEditHandler} />
        <button
          className={'delete-btn'}
          onClick={() => deleteHandler(car.id)}
        />
      </div>
      <div className={'card-line'}>
        <div>Марка</div>
        <input
          type='text'
          className={'input'}
          value={formState.name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={!isEdit}
        />
      </div>
      <div className={'card-line'}>
        <div>Модель</div>
        <input
          type='text'
          className={'input'}
          value={formState.model}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, model: e.target.value }))
          }
          disabled={!isEdit}
        />
      </div>
      <div className={'card-line'}>
        <div>Год</div>
        <input
          type='number'
          className={'input'}
          value={formState.year}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              year: parseInt(e.target.value),
            }))
          }
          disabled={!isEdit}
        />
      </div>
      <div className={'card-line'}>
        <div>Цвет</div>
        <input
          type='text'
          className={'input'}
          value={formState.color}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, color: e.target.value }))
          }
          disabled={!isEdit}
        />
      </div>
      <div className={'card-line'}>
        <div>Стоимость</div>
        <input
          type='number'
          className={'input'}
          value={formState.price}
          onChange={(e) => {
            setFormState((prev) => ({
              ...prev,
              price: parseInt(e.target.value),
            }));
          }}
          disabled={!isEdit}
        />
      </div>
    </div>
  );
};

export default CarCard;
