import { mergeTests } from '@playwright/test'
import { qwaTest } from '../../qwaFramework/core/fixtures/qwaTestFixture'
import { pagesFixture } from './pageFixture'

/**
 * @description Фикстура для создания тестов
 * Мержит qwa core фикстуры и фикстуры проекта с тестами
 *
 * Для подключения своих кастомных шагов необходимо исключить qwaSteps и подключить
 * фикстуру с своими шагами по аналогии с qwaSteps
 */
export const test = mergeTests(qwaTest, pagesFixture)
