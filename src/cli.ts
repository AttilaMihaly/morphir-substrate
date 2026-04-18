#!/usr/bin/env node
/**
 * CLI entry point — the only module with side-effects.
 *
 * Provides the `substrate verify` command that runs the full
 * verification pipeline on a substrate markdown document.
 */
import { Command } from "commander";
import { resolve } from "node:path";
import { verify } from "./pipeline.js";
import { consoleListener, printSummary, exitCode } from "./progress.js";

const program = new Command();

program
    .name("substrate")
    .description("Verification tool for Morphir Substrate markdown specifications")
    .version("0.1.0");

program
    .command("verify <file>")
    .description(
        "Verify a substrate markdown document through the full pipeline: " +
        "parse → include → lint → references → typecheck → test",
    )
    .option("-q, --quiet", "Suppress progress output; only print the summary", false)
    .action(async (file: string, opts: { quiet: boolean }) => {
        const filePath = resolve(process.cwd(), file);
        const listener = opts.quiet ? undefined : consoleListener();

        console.log(`Verifying: ${filePath}`);

        const result = await verify(filePath, listener);

        printSummary(result);
        process.exitCode = exitCode(result);
    });

program.parse(process.argv);
