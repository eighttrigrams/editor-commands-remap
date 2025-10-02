import { Plugin, Editor, EditorCommandName } from 'obsidian';


export default class EditorCommandsRemapPlugin extends Plugin {

	async onload() {

		this.addCommand({
			id: 'go-left',
			name: 'go left',
			editorCallback: editor => editor.exec('goLeft')
		});

		this.addCommand({
			id: 'go-right',
			name: 'go right',
			editorCallback: editor => editor.exec('goRight')
		});

		this.addCommand({
			id: 'go-up',
			name: 'go up',
			editorCallback: editor => editor.exec('goUp')
		});

		this.addCommand({
			id: 'go-down',
			name: 'go down',
			editorCallback: editor => editor.exec('goDown')
		});

		this.addCommand({
			id: 'go-word-left',
			name: 'go word left',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				let ch = cursor.ch;
				
				while (ch > 0 && /\s/.test(line[ch - 1])) ch--;
				while (ch > 0 && !/\s/.test(line[ch - 1])) ch--;
				
				editor.setCursor({ line: cursor.line, ch });
			}
		});

		this.addCommand({
			id: 'go-word-right',
			name: 'go word right',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				let ch = cursor.ch;
				
				while (ch < line.length && !/\s/.test(line[ch])) ch++;
				while (ch < line.length && /\s/.test(line[ch])) ch++;
				
				editor.setCursor({ line: cursor.line, ch });
			}
		});

		this.addCommand({
			id: 'go-left-select',
			name: 'go left with selection',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const anchor = editor.getCursor('anchor');
				const newCursor = { line: cursor.line, ch: Math.max(0, cursor.ch - 1) };
				editor.setSelection(anchor, newCursor);
			}
		});

		this.addCommand({
			id: 'go-right-select',
			name: 'go right with selection',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const anchor = editor.getCursor('anchor');
				const line = editor.getLine(cursor.line);
				const newCursor = { line: cursor.line, ch: Math.min(line.length, cursor.ch + 1) };
				editor.setSelection(anchor, newCursor);
			}
		});

		this.addCommand({
			id: 'go-up-select',
			name: 'go up with selection',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const anchor = editor.getCursor('anchor');
				const newCursor = { line: Math.max(0, cursor.line - 1), ch: cursor.ch };
				editor.setSelection(anchor, newCursor);
			}
		});

		this.addCommand({
			id: 'go-down-select',
			name: 'go down with selection',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const anchor = editor.getCursor('anchor');
				const lineCount = editor.lineCount();
				const newCursor = { line: Math.min(lineCount - 1, cursor.line + 1), ch: cursor.ch };
				editor.setSelection(anchor, newCursor);
			}
		});

		this.addCommand({
			id: 'go-word-left-select',
			name: 'go word left with selection',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const anchor = editor.getCursor('anchor');
				const line = editor.getLine(cursor.line);
				let ch = cursor.ch;
				
				while (ch > 0 && /\s/.test(line[ch - 1])) ch--;
				while (ch > 0 && !/\s/.test(line[ch - 1])) ch--;
				
				editor.setSelection(anchor, { line: cursor.line, ch });
			}
		});

		this.addCommand({
			id: 'go-word-right-select',
			name: 'go word right with selection',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const anchor = editor.getCursor('anchor');
				const line = editor.getLine(cursor.line);
				let ch = cursor.ch;
				
				while (ch < line.length && !/\s/.test(line[ch])) ch++;
				while (ch < line.length && /\s/.test(line[ch])) ch++;
				
				editor.setSelection(anchor, { line: cursor.line, ch });
			}
		});

		this.addCommand({
			id: 'delete-word-right',
			name: 'delete word right',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				let endCh = cursor.ch;
				
				while (endCh < line.length && !/\s/.test(line[endCh])) endCh++;
				while (endCh < line.length && /\s/.test(line[endCh])) endCh++;
				
				editor.replaceRange('', cursor, { line: cursor.line, ch: endCh });
			}
		});

		this.addCommand({
			id: 'delete-char-right',
			name: 'delete character right',
			editorCallback: (editor: Editor) => {
				const cursor = editor.getCursor();
				const line = editor.getLine(cursor.line);
				if (cursor.ch < line.length) {
					editor.replaceRange('', cursor, { line: cursor.line, ch: cursor.ch + 1 });
				} else if (cursor.line < editor.lineCount() - 1) {
					editor.replaceRange('', cursor, { line: cursor.line + 1, ch: 0 });
				}
			}
		});

		this.addCommand({
			id: 'go-start',
			name: 'go to start',
			editorCallback: editor => editor.exec('goStart')
		});

		this.addCommand({
			id: 'go-end',
			name: 'go to end',
			editorCallback: editor => editor.exec('goEnd')
		});

		this.addCommand({
			id: 'indent-more',
			name: 'indent more',
			editorCallback: editor => editor.exec('indentMore')
		});

		this.addCommand({
			id: 'indent-less',
			name: 'indent less',
			editorCallback: editor => editor.exec('indentLess')
		});

		this.addCommand({
			id: 'new-line-indent',
			name: 'new line and indent',
			editorCallback: editor => editor.exec('newlineAndIndent')
		});

		this.addCommand({
			id: 'swap-line-up',
			name: 'swap line up',
			editorCallback: editor => editor.exec('swapLineUp')
		});

		this.addCommand({
			id: 'swap-line-down',
			name: 'swap line down',
			editorCallback: editor => editor.exec('swapLineDown')
		});

		this.addCommand({
			id: 'delete-line',
			name: 'delete line',
			editorCallback: editor => editor.exec('deleteLine')
		});

		this.addCommand({
			id: 'toggle-fold',
			name: 'toggle fold',
			editorCallback: editor => editor.exec('toggleFold')
		});

		this.addCommand({
			id: 'fold-all',
			name: 'fold all',
			editorCallback: editor => editor.exec('foldAll')
		});

		this.addCommand({
			id: 'unfold-all',
			name: 'unfold all',
			editorCallback: editor => editor.exec('unfoldAll')
		});
	}
}