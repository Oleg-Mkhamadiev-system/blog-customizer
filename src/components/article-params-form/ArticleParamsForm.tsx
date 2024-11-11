import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useCallback, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
} from 'src/constants/articleProps';
import { Text } from '../text';
import clsx from 'clsx';
import { Select } from '../select';

export type IArticleParamsForm = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: IArticleParamsForm) => {
	const { setAppState } = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [form, setForm] = useState<ArticleStateType>(defaultArticleState);

	const fieldChange = (field: string) => {
		return (value: OptionType) => {
			setForm((currentStateForm) => ({
				...currentStateForm,
				[field]: value,
			}));
		};
	};

	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(form);
	};

	const handleFormReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setForm(defaultArticleState);
		setAppState(defaultArticleState);
	};

	const toggleForm = useCallback(() => {
		setIsOpen((isOpen) => !isOpen);
	}, []);

	return (
		<>
			<ArrowButton isOpened={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleFormReset}>
					<Text uppercase={true} weight={800} size={31} family='open-sans'>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='Шрифт'
						selected={form.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={fieldChange('fontFamilyOption')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
