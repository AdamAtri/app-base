import * as app from 'tns-core-modules/application';
import { initializeStyles } from './styles';
initializeStyles(app);

app.run({ moduleName: 'app-root' });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
