import { red, cyan, cyanBright } from 'colorette';
import 'console.table';

export const main = (): void => {
  const path =
    process.argv.find(arg => /^--path/.exec(arg)) !== undefined
      ? process.argv?.find(arg => arg.includes('--path='))?.split('=')[1]
      : `${process.cwd()}/package.json`;

  const packageJson: {
    [K in string]: {
      [K2 in string]: string;
    };
  } = require(path as string);

  console.log(packageJson);

  const devDependencies =
    packageJson?.['devDependencies'] !== undefined
      ? Object.entries(packageJson['devDependencies'])
      : undefined;
  const dependencies =
    packageJson?.['dependencies'] !== undefined
      ? Object.entries(packageJson['dependencies'])
      : undefined;
  const peerDependencies =
    packageJson?.['peerDependencies'] !== undefined
      ? Object.entries(packageJson['peerDependencies'])
      : undefined;
  const optionalDependencies =
    packageJson?.['optionalDependencies'] !== undefined
      ? Object.entries(packageJson['optionalDependencies'])
      : undefined;
  const bundledDependencies =
    packageJson?.['bundledDependencies'] !== undefined
      ? Object.entries(packageJson['bundledDependencies'])
      : undefined;

  const dependenciesList: { packageName: string; version: string }[] = [];
  dependencies?.forEach(([key, value]) => {
    if (value.slice(0, 1) === '^') {
      dependenciesList.push({ packageName: key, version: value });
    }
  });

  const devDependenciesList: { packageName: string; version: string }[] = [];
  devDependencies?.forEach(([key, value]) => {
    if (value.slice(0, 1) === '^') {
      devDependenciesList.push({ packageName: key, version: value });
    }
  });

  const peerDependenciesList: { packageName: string; version: string }[] = [];
  peerDependencies?.forEach(([key, value]) => {
    if (value.slice(0, 1) === '^') {
      peerDependenciesList.push({ packageName: key, version: value });
    }
  });

  const optionalDependenciesList: {
    packageName: string;
    version: string;
  }[] = [];
  optionalDependencies?.forEach(([key, value]) => {
    if (value.slice(0, 1) === '^') {
      optionalDependenciesList.push({ packageName: key, version: value });
    }
  });

  const bundledDependenciesList: {
    packageName: string;
    version: string;
  }[] = [];
  bundledDependencies?.forEach(([key, value]) => {
    if (value.slice(0, 1) === '^') {
      bundledDependenciesList.push({ packageName: key, version: value });
    }
  });

  if (
    dependenciesList.length === 0 &&
    devDependenciesList.length === 0 &&
    peerDependenciesList.length === 0 &&
    optionalDependenciesList.length === 0 &&
    bundledDependenciesList.length === 0
  ) {
    console.log(
      cyan('Excellent!! all of dependencies version is not contain caret')
    );
  } else {
    if (dependencies !== undefined && dependenciesList.length > 0) {
      console.log(red('Dependencies found caret \n'));
      console.table(dependenciesList);
    } else if (dependencies !== undefined && dependenciesList.length === 0) {
      console.log(
        cyan(
          'Great!! "dependencies" found in package.json and not containing caret!!'
        )
      );
    }
    if (devDependencies !== undefined && devDependenciesList.length !== 0) {
      console.log(red('DevDependencies found caret \n'));
      console.table(devDependenciesList);
    } else if (
      devDependencies !== undefined &&
      devDependenciesList.length === 0
    ) {
      console.log(
        cyan(
          'Great!! "devDependencies" found in package.json and not containing caret!!'
        )
      );
    }

    if (peerDependencies !== undefined && peerDependenciesList.length !== 0) {
      console.log(red('PeerDependencies found caret \n'));
      console.table(peerDependenciesList);
    } else if (
      peerDependencies !== undefined &&
      peerDependenciesList.length === 0
    ) {
      console.log(
        cyan(
          'Great!! "peerDependencies" found in package.json and not containing caret!!'
        )
      );
    }

    if (
      optionalDependencies !== undefined &&
      optionalDependenciesList.length !== 0
    ) {
      console.log(red('OptionalDependencies found caret \n'));
      console.table(optionalDependenciesList);
    } else if (
      optionalDependencies !== undefined &&
      optionalDependenciesList.length === 0
    ) {
      console.log(
        cyan(
          'Great!! "optionalDependencies" found in package.json and not containing caret!!'
        )
      );
    }

    if (
      bundledDependencies !== undefined &&
      bundledDependenciesList.length !== 0
    ) {
      console.log(red('bundledDependencies found caret \n'));
      console.table(bundledDependenciesList);
    } else if (
      bundledDependencies !== undefined &&
      bundledDependenciesList.length === 0
    ) {
      console.log(
        cyan(
          'Great!! "bundledDependencies" found in package.json and not containing caret!!'
        )
      );
    }

    throw new Error(
      red(
        `Please remove ${
          dependenciesList.length > 0 ? cyanBright('dependencies') : ''
        } ${
          devDependenciesList.length > 0 ? cyanBright('devDependencies') : ''
        }  ${
          peerDependenciesList.length > 0 ? cyanBright('peerDependencies') : ''
        }${
          optionalDependenciesList.length > 0
            ? cyanBright('optionalDependencies')
            : ''
        }${
          bundledDependenciesList.length > 0
            ? cyanBright('bundledDependencies')
            : ''
        } caret`
      )
    );
  }
};

main();
