/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Given a template entity, return information about it which is ready to be
 * rendered, such as the title and description.
 *
 * @param {Object} template The template for which we need information.
 * @return {Object} Information about the template, including title and description.
 */
export default function useTemplateInfo( template ) {
	const defaultTemplateTypesDefinitions = useSelect(
		( select ) =>
			select( 'core/edit-site' ).getDefaultTemplateTypesDefinitions(),
		[]
	);

	if ( ! template ) {
		return {};
	}

	if ( 'wp_template_part' === template.type ) {
		return { title: template.slug, description: '' };
	}

	const { title: defaultTitle, description: defaultDescription } =
		defaultTemplateTypesDefinitions[ template.slug ] || {};

	const title = template?.title?.rendered || defaultTitle || template.slug;
	const description = template?.excerpt?.raw || defaultDescription;
	return { title, description };
}
