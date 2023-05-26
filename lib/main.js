"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const axios_1 = __importDefault(require("axios"));
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1020292115101667368/lS7DoJGWo1AmWQcSWH7j9b1EbizVYG95Sfm6zexaoGv1P4SiDTN0ODBYqMhKvp5xQMpr';
function run() {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const { payload, runId, ref } = github.context;
        const branch = ref.split('/').at(-1);
        const embed = {
            timestamp: new Date().toISOString(),
            description: '👍',
            color: 0x7fff00,
            title: `${(_a = payload.repository) === null || _a === void 0 ? void 0 : _a.full_name}@${branch}`,
            fields: [
                {
                    name: 'Commit',
                    value: payload.head_commit ? `[${payload.head_commit.message}](${payload.head_commit.url})` : 'manual trigger',
                },
                {
                    name: 'Action',
                    value: `[${runId}](${(_b = payload.repository) === null || _b === void 0 ? void 0 : _b.html_url}/actions/runs/${runId})`,
                },
            ],
            author: {
                name: (_c = payload.sender) === null || _c === void 0 ? void 0 : _c.login,
                icon_url: (_d = payload.sender) === null || _d === void 0 ? void 0 : _d.avatar_url,
                url: (_e = payload.sender) === null || _e === void 0 ? void 0 : _e.url,
            },
            footer: {
                text: 'cloudticon',
            },
            provider: {
                name: 'github',
                url: 'https://github.com/',
            },
        };
        try {
            yield axios_1.default.post(WEBHOOK_URL, { content: '@everyone', embeds: [embed] });
        }
        catch (error) {
            core.setFailed(JSON.stringify(error));
        }
    });
}
run();
