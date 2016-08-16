import { post } from './internalMethods'

export function postEvent(key, properties) {
	return post(`events/${key}`, { properties: encodeURIComponent(JSON.stringify(properties))})
}