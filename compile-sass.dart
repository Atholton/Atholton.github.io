import 'dart:io';
import 'package:sass/sass.dart' as sass;

final Directory source = Directory('styles/sass'); 

void main(List<String> args) async {
    print('Compiling...');
    bool doLog = args.contains('-v');
    int errCount = await writeAllSassCompilation(source, doLog);
    print('Finished with ${errCount} errors.');
}

Future<int> writeAllSassCompilation(Directory dir, bool doLog, [int errCount = 0]) async {
    var dirList = dir.list();
    await for (final FileSystemEntity f in dirList) {
        if (f is File) {
            if(doLog) {
                print('Compiling File at ${f.path}');
            }
            try {
                writeSassCompilation(f);
            } catch (e) {
                print(e.toString());
                print('Could not compile due to error above; skipping file');
                errCount++;
            }
        } else if (f is Directory) {
            errCount = await writeAllSassCompilation(f, doLog, errCount);
        }
    }

    return errCount;
}

void writeSassCompilation(File sassf) async {
    final String outPath = sassPathToCssPath(sassf.path);

    var result = sass.compileToResult(sassf.path);

    File(outPath).writeAsString(result.css);
}

String sassPathToCssPath(String css) {
    StringBuffer sb = StringBuffer();
    var files = css.split(RegExp(r'[\\\/]'));
    sb.write(files.first); // styles
    sb.write('/css/'); // styles/css
    // skip the first 2 and last
    for(int i = 2; i < files.length - 1; i++) {
        sb
            ..write(files[i])
            ..write('/');
    }
    var fileName = files.last;
    // write file name without extension
    sb.write(fileName.substring(0, fileName.lastIndexOf('.')));
    sb.write('.css');
    return sb.toString();
}
