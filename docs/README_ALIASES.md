# Aliased Imports

Most project imports are aliased for easy reading. If possible please use aliased imports.
eslint.config.js defines the linting rules, and has been set up to try enforce the imports of aliases.
Imports with aliases can be found within vite.config.ts file.

To add an alias import, please add an additional option to the vite.config.ts file as well as to the tsconfig.app.json, which will allow typescript to process the the aliased imports.

Aliased imports can be used like the following:

```
import CustomButton from '@components/CustomButton';
```