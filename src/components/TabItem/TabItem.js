import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './TabItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPlanner } from '~/features/plannerSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

const cx = classNames.bind(styles);

function TabItem({ dayOfWeek, meal, handleDeleteClick }) {
    const { data: planner, loading } = useSelector((state) => ({ ...state.planner }));

    const plannerData = planner ? planner.filter((data) => data.dayOfWeek === dayOfWeek && data.meal === meal) : null;
    const plannerResult = plannerData ? plannerData : [];

    return (
        <>
            {planner ? (
                plannerResult.map((p) => (
                    <div className={cx('wrapper')} key={p.plannerId.toString()}>
                        <Image className={cx('avatar')} src="" alt={p.recipe.title || 'title'} />
                        <div className={cx('info')}>
                            <div>
                                <h4 className={cx('name')}>
                                    <span>{p.recipe.title || 'title'}</span>
                                    {/* {planner.account.activated && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />} */}
                                </h4>
                                <span className={cx('description')}>
                                    {p.recipe.briefDescription || 'brief description'}
                                </span>
                            </div>
                            <Button onClick={(e) => handleDeleteClick(e, p)} className={cx('storage-button')}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    </div>
                ))
            ) : (
                <span className="spinner-border m-3"></span>
            )}
        </>
    );
}

export default TabItem;
