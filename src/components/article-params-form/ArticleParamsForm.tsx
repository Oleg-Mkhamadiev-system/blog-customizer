import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useCallback, useRef, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Text } from '../text';
import clsx from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export type IArticleParamsForm = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: IArticleParamsForm) => {
	const { setAppState } = props;

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [form, setForm] = useState<ArticleStateType>(defaultArticleState);

	const containerRef = useRef<HTMLDivElement>(null);

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
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	}, []);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
		rootRef: containerRef,
	});

	return (
		<>
			<div ref={containerRef}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleForm} />
				<aside
					className={clsx(
						styles.container,
						isMenuOpen && styles.container_open
					)}>
					<form
						className={styles.form}
						onSubmit={handleSubmitForm}
						onReset={handleFormReset}>
						<Text
							uppercase={true}
							weight={800}
							size={31}
							family='open-sans'
							as={'h2'}>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
						<Select
							title='Шрифт'
							selected={form.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={fieldChange('fontFamilyOption')}
						/>
						<RadioGroup
							title='Размер шрифта'
							name='fontSizeOption'
							selected={form.fontSizeOption}
							options={fontSizeOptions}
							onChange={fieldChange('fontSizeOption')}
						/>
						<Select
							title='Цвет шрифта'
							selected={form.fontColor}
							options={fontColors}
							onChange={fieldChange('fontColor')}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={form.backgroundColor}
							options={backgroundColors}
							onChange={fieldChange('backgroundColor')}
						/>
						<Select
							title='Ширина контента'
							selected={form.contentWidth}
							options={contentWidthArr}
							onChange={fieldChange('contentWidth')}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
