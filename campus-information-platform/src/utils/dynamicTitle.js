import store from '@/store';
import useSettingsStore from '@/store/modules/settings';

/**
 * 动态修改标题
 */
export function useDynamicTitle() {
	const settingsStore = useSettingsStore();
	document.title = settingsStore.title;
}
