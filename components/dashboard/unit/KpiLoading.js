import React from 'react';
import { UnitBox, Unit, UnitLayer } from './Unit';
import { Placeholder } from 'semantic-ui-react';

const KpiLoading = ({ title }) => {
	return (
		<UnitBox>
			<UnitLayer title={title}>
				<Unit>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line />
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Unit>

				<Unit>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line />
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Unit>

				<Unit>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line />
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Unit>
				<Unit>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line />
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Unit>
				<Unit>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line />
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
					</Placeholder>
				</Unit>
				<Unit>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Paragraph>
					</Placeholder>
				</Unit>
				<Unit>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line />
							<Placeholder.Line />
						</Placeholder.Paragraph>
					</Placeholder>
				</Unit>
			</UnitLayer>
		</UnitBox>
	);
};

export default KpiLoading;
