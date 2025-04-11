/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Author: Xterminator
 * Edited by XxOsirisxX

	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
    任务 - 罗杰的苹果
*/
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0)
            qm.sendNext("嘿，" + (qm.getPlayer().getGender() == 0 ? "小伙子" : "小姑娘") + "~ 最近怎么样啊？哈哈！我是罗杰，专门为你们这些可爱的新手冒险家提供指导的。");
        else if (status == 1)
            qm.sendNextPrev("你问是谁让我来帮忙的？啊哈哈哈！\r\n当然是我自愿的啦！就是想照顾下你们这些初来乍到的旅行者。");
        else if (status == 2)
            qm.sendAcceptDecline("那么......让我们开始趣味教学吧！阿布拉卡达布拉~！");
        else if (status == 3) {
            if (qm.getPlayer().getHp() >= 50) {
                qm.getPlayer().updateHp(25);
            }
            
            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }
            
            qm.forceStartQuest();
            qm.sendNext("惊喜吗？如果HP归零可就麻烦啦。现在我要给你#r罗杰的苹果#k，吃下它会感觉充满力量。打开物品栏双击使用就行。对了，按#bI键#k就能快速打开物品栏哦。");
        } else if (status == 4) {
            qm.sendPrev("把我给你的苹果都吃掉吧，看着HP条涨上去。等HP恢复到100%再来找我。");
        } else if (status == 5) {
            qm.showInfo("UI/tutorial.img/28");
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0)
            if (qm.c.getPlayer().getHp() < 50) {
                qm.sendNext("喂，你的HP还没回满呢。把我给的苹果都吃了吗？确定吗？");
                qm.dispose();
            } else
                qm.sendNext("使用物品很简单吧？还有个技巧：你可以给物品设置#b快捷键#k，就在界面右下角。哈哈没想到吧？另外新手会自动缓慢恢复HP，虽然需要点时间，但对萌新很实用哦。");
        else if (status == 1)
            qm.sendNextPrev("好啦！既然学了这么多，送你份礼物。这可是冒险必备品，记得好好感谢我！紧急时刻才能用哦！");
        else if (status == 2)
            qm.sendPrev("能教你的就这么多啦。虽然舍不得，但该说再见啦。保重自己，祝你好运伙伴！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3个#t2010000#\r\n#v2010009# 3个#t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10点经验值");
        else if (status == 3) {
            if(qm.isQuestCompleted(1021))
                qm.dropMessage(1,"未知错误");
            else if(qm.canHold(2010000) && qm.canHold(2010009)){
                qm.gainExp(10);
                qm.gainItem(2010000, 3);
                qm.gainItem(2010009, 3);
                qm.forceCompleteQuest();
            }else
                qm.dropMessage(1,"背包空间不足");
            qm.dispose();
        }
    }
}