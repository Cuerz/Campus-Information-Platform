/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80300 (8.3.0)
 Source Host           : localhost:3306
 Source Schema         : campus

 Target Server Type    : MySQL
 Target Server Version : 80300 (8.3.0)
 File Encoding         : 65001

 Date: 17/05/2024 21:48:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity` (
  `activity_id` int NOT NULL AUTO_INCREMENT COMMENT '活动编号',
  `user_id` int DEFAULT NULL COMMENT '用户编号',
  `activity_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '活动标题',
  `activity_label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动标签',
  `activity_locale` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动场地',
  `activity_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '活动描述',
  `examine` tinyint(1) NOT NULL DEFAULT '0' COMMENT '审核状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of activity
-- ----------------------------
BEGIN;
INSERT INTO `activity` (`activity_id`, `user_id`, `activity_title`, `activity_label`, `activity_locale`, `activity_description`, `examine`, `create_time`, `update_time`) VALUES (1, 1, ' 3月2日篮球比赛', '体育', '西苑篮球场', '今天晚上在西苑篮球场举办计算机学院和人工智能学院篮球交流赛，欢迎大家来观赛，快来为你喜欢的队伍加油助威吧。', 1, '2024-03-02 06:32:44', '2024-03-07 11:13:58');
INSERT INTO `activity` (`activity_id`, `user_id`, `activity_title`, `activity_label`, `activity_locale`, `activity_description`, `examine`, `create_time`, `update_time`) VALUES (2, 2, '3月10日计算机学院-植树主题活动', '志愿者', '南京市江北区龙王山景区', '生命之花绽放青春，土地滋养希望深，阳光下，绿荫生，青春绿美，芬芳盎然，只此青绿，不负暖意。在3月12日植树节来临之际，南京信息工程大学计算机学院在3月10日前往龙王山举办本次“你\'植\'得如此好看”主题活动，秉持志愿、奉献、环保、进步的理念，旨在让同学们在龙王山踏青锻炼身体的同时，为地球母亲增添一抹绿色，体会树木对于自然，对于我们的重要，提升同学们“保护环人人有责”的责任感，让属于我们南信大计算机学院的“志愿红”更加鲜艳。', 1, '2024-03-07 11:07:58', '2024-03-08 02:15:13');
INSERT INTO `activity` (`activity_id`, `user_id`, `activity_title`, `activity_label`, `activity_locale`, `activity_description`, `examine`, `create_time`, `update_time`) VALUES (3, 2, ' 3月10日中国红会历史讲座', '志愿者', '滨江报告厅', '于 3月10日中国红十字会120周年当天向全校同学科普中国红十字会120年的奋斗历史，追溯中国红会成立120年来的历史变迁、成就和影响。讲座将介绍中国红会的创立背景、发展历程，以及在医疗救助、灾难救助、志愿服务等领域取得的丰硕成果。通过讲座，让同学们更加全面地了解中国红会的历史价值、人道主义精神以及其对中国社会发展的积极影响。激发更多大学生对中国红会的关注与支持，共同推动公益事业的蓬勃发展。', 1, '2024-03-07 11:13:02', '2024-03-07 11:13:44');
COMMIT;

-- ----------------------------
-- Table structure for announcement
-- ----------------------------
DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `announcement_id` int NOT NULL AUTO_INCREMENT COMMENT '公告文章编号',
  `announcement_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '公告文章标题',
  `announcement_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '公告文章内容',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`announcement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of announcement
-- ----------------------------
BEGIN;
INSERT INTO `announcement` (`announcement_id`, `announcement_title`, `announcement_content`, `create_time`, `update_time`) VALUES (1, '关于2024年上半年部分节假日安排的通知', '各单位：\r\n\r\n根据上级最新通知精神（国办发明电〔2023〕7号），现将2024年部分节假日安排通知如下：\r\n\r\n一、放假安排\r\n\r\n（一）元旦：1月1日放假，与周末连休。\r\n\r\n（二）清明节：4月4日至6日放假调休，共3天。4月5日（星期五）的教学活动调整至4月7日（星期日）进行。\r\n\r\n（三）劳动节：5月1日至5日放假调休，共5天。5月2日（星期四）的教学活动调整至4月28日（星期日）进行，5月3日（星期五）的教学活动调整至5月11日（星期六）进行。\r\n\r\n（四）端午节：6月10日放假，与周末连休。\r\n\r\n二、车辆安排\r\n\r\n校园小公交正常运行,如有调整另行通知。\r\n\r\n三、其它事项\r\n\r\n（一）请各单位认真做好放假期间的工作安排，将通知内容传达至本单位师生员工，落实好安全教育、人员值班、资料归档、数据备份、防火防盗等工作。研工部、学工处、国教院、继教院以及各学院要加强对学生的安全教育，做好学生假期去向登记，安排学生工作联系人，负责假期突发事件的处理。\r\n\r\n（二）保卫、总务（后勤）、网络等相关部门要根据上级要求做好安全保卫、水电供应、餐饮安全、网络安全等保障工作。请保卫处、总务处（后勤服务总公司）假期内安排专人每天24小时值班，并将值班安排于假期前3日报党校办（E-mail:office2@nuist.edu.cn）。\r\n\r\n放假期间24小时值班电话：保卫处58736110，总务处（后勤服务总公司）58731391。', '2024-03-11 01:17:57', '2024-03-11 01:49:40');
COMMIT;

-- ----------------------------
-- Table structure for lost_items
-- ----------------------------
DROP TABLE IF EXISTS `lost_items`;
CREATE TABLE `lost_items` (
  `lost_id` int NOT NULL AUTO_INCREMENT COMMENT '失物编号',
  `user_id` int NOT NULL COMMENT '用户编号',
  `item_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '失物名称',
  `item_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '失物图片',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '失物描述',
  `contact_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '联系方式',
  `examine` tinyint(1) NOT NULL DEFAULT '0' COMMENT '审核状态',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`lost_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of lost_items
-- ----------------------------
BEGIN;
INSERT INTO `lost_items` (`lost_id`, `user_id`, `item_name`, `item_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (1, 2, '校园卡', 'http://localhost:8080/images/b573f264-1ada-4205-880d-a3cac092df97.jpg', '在中苑新食堂一楼发现一张遗失的校园卡，已放在一楼失物认领处，可前往认领。', '17312260271', 1, '2024-03-07 07:04:31', '2024-05-17 13:02:43');
INSERT INTO `lost_items` (`lost_id`, `user_id`, `item_name`, `item_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (2, 2, '水杯', 'http://localhost:8080/images/406f5ed2-f20a-426c-a65f-9619a052debd.jpg', '中午西苑借车的时候上面挂了个水杯，放在西苑百佳超市收银台了。', '18679524684', 1, '2024-03-07 07:07:30', '2024-03-07 07:14:20');
INSERT INTO `lost_items` (`lost_id`, `user_id`, `item_name`, `item_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (3, 2, '耳机', 'http://localhost:8080/images/810a33de-a193-477c-9a25-786915d3c050.jpg', '图书馆二楼左侧桌子上有一只耳机遗落，放在原位了。', '15675279354', 1, '2024-03-07 07:12:31', '2024-03-07 07:14:22');
INSERT INTO `lost_items` (`lost_id`, `user_id`, `item_name`, `item_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (4, 2, '充电宝', 'http://localhost:8080/images/9b2bc66f-f6e4-4f38-a42e-905d16e84b91.jpg', '文德楼N301教室后排抽屉中有一只充电宝，已放到讲台上。', '14963782486', 1, '2024-03-07 07:14:14', '2024-03-07 07:20:50');
COMMIT;

-- ----------------------------
-- Table structure for old_stuff
-- ----------------------------
DROP TABLE IF EXISTS `old_stuff`;
CREATE TABLE `old_stuff` (
  `old_stuff_id` int NOT NULL AUTO_INCREMENT COMMENT '二手物品编号',
  `user_id` int NOT NULL COMMENT '用户编号',
  `old_stuff_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '二手物品名称',
  `old_stuff_pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '二手物品图片',
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '二手物品描述',
  `contact_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '联系方式',
  `examine` tinyint(1) NOT NULL DEFAULT '0' COMMENT '审核状态',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`old_stuff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of old_stuff
-- ----------------------------
BEGIN;
INSERT INTO `old_stuff` (`old_stuff_id`, `user_id`, `old_stuff_name`, `old_stuff_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (1, 1, '蓝牙耳机', 'http://localhost:8080/images/804b5a84-4764-4cab-83a7-cf4f8b265c92.jpg', 'TWS-5.0 i12升级版无线蓝牙运动耳机“带弹窗功能”真正无线连接（TWS）实现无线立体声，左右声道分离，HIFI音效。左右耳均具有完整蓝牙功能，可单独使用，也可以成对使用。这个是触控版的包装清单：无线蓝牙双耳➕双耳充电仓➕苹果充电线➕说明书➕彩盒一起发货质量问题包退包换，全国售后质保服务！本交易仅支持邮寄', '16852371685', 1, '2024-03-08 07:52:59', '2024-03-08 07:54:04');
INSERT INTO `old_stuff` (`old_stuff_id`, `user_id`, `old_stuff_name`, `old_stuff_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (2, 1, '羽毛球拍', 'http://localhost:8080/images/07d07e16-329e-4765-b0e7-1acd4ec61322.jpg', '多年球龄解答女士专用6u超轻入门初学耐打全碳素羽毛球拍孩童1：首先，本人也是打了多年的羽毛球，路过的球友。 就算没有买也可咨询羽毛球的球技，和羽毛球拍的相关问题。2：这款超轻的球拍重量是在6u（空拍72克左右）。属于超轻系列，比较适合入门却又想要好点球拍的女生，为什么说比较适合女生，而不是专门说男生？因为男生力量肌肉比较大，就算球技差但是更多的是发力技巧上的缺陷而不是力量上的不足，如果男生一开始拿超轻的球拍，后期进步了杀球会感觉不带劲，就需要换拍，而女生业余的力量稍显弱，同时，女生在入门的情况后场球可以熟练基本就能很好。 后期双打配合中，需要在前场封网。对于女生来说，轻质的都会比较合适。3：球拍均为全碳素，包括手柄也是碳素材质，最高能承受28磅的磅数，但是球拍已经默认拉好耐打线，磅数在23-24磅（初学不能太高磅数否则发力不对很容易因为高磅数而伤手腕，），有需要换成YY或者李宁线的可以补差价。送手胶拍套和护腕，基本我比赛 怎么配置，就会怎么给安排。', '18547925843', 1, '2024-03-08 08:15:25', '2024-03-08 08:20:23');
INSERT INTO `old_stuff` (`old_stuff_id`, `user_id`, `old_stuff_name`, `old_stuff_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (3, 1, 'c语言程序设计', 'http://localhost:8080/images/95604cda-c593-421b-8109-7ff1d6596770.jpg', 'C语言程序设计清华大学出版社谭浩强第四版。教材单本11.9包邮，另有配套学习辅导单本14.9包邮。一套2本25包邮，正版包邮，正版包邮，正版包邮，重要的事情说三遍。书都是从高校回收的，绝对是正版的，可以放心使用，所有书都是经过筛选的，新旧程度为8成新左右，没有缺页，破损，不影响正常使用。注：新疆，内蒙，西藏，不包邮。', '18349267429', 1, '2024-03-08 08:22:31', '2024-03-08 08:26:16');
INSERT INTO `old_stuff` (`old_stuff_id`, `user_id`, `old_stuff_name`, `old_stuff_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (4, 1, 'MySQL必会', 'http://localhost:8080/images/0b27d07f-a848-470c-97dc-4e15fed17217.jpg', 'MySQL必知必会。非纸质版的，无水印。内容截图在下面。需要的，可以直接联系。另有其他计算机类的需要可以联系。', '17268159462', 1, '2024-03-08 08:24:08', '2024-03-08 08:27:13');
INSERT INTO `old_stuff` (`old_stuff_id`, `user_id`, `old_stuff_name`, `old_stuff_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (5, 1, '足球', 'http://localhost:8080/images/4f3773e9-efd9-402f-8ec0-9d2ea618d146.jpg', '世达2000正品手缝足球。全新正品世达star2000手缝足球 全新正品世达star2000手缝足球，型号SB225，剩几个库存现货，处理价80包邮（不议价）！全新正品，送球针球网兜。需要私聊。所有图片均为原相机拍摄，没用任何美图软件，自己看细节！足球缝线：手缝足球 材质：超级纤维 足球尺寸：5号球(正规11人制用)。', '17312258462', 1, '2024-03-08 08:26:01', '2024-03-08 08:26:21');
INSERT INTO `old_stuff` (`old_stuff_id`, `user_id`, `old_stuff_name`, `old_stuff_pic`, `description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (7, 1, '握力器', 'http://localhost:8080/images/987b2fdd-b156-4e8f-bae1-d328e2654222.jpg', '专业手力精钢握力器男。除新疆、西藏等偏远地区，全国包邮。全新金、属握力器、臂力惊人。100磅的20包邮，150磅的21包邮，200磅的22包邮，250 磅的23包邮，300磅的24包邮。三种款式随机发货。100磅+150磅+200磅，初级套组53。150磅+200磅+250磅，中级套组55。200磅+250磅+300磅高级套组58。', '18437954328', 0, '2024-03-08 08:30:49', '2024-03-08 08:31:02');
COMMIT;

-- ----------------------------
-- Table structure for recruit
-- ----------------------------
DROP TABLE IF EXISTS `recruit`;
CREATE TABLE `recruit` (
  `recruit_id` int NOT NULL AUTO_INCREMENT COMMENT '岗位编号',
  `user_id` int NOT NULL COMMENT '用户编号',
  `job_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '岗位名称',
  `job_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '岗位描述',
  `contact_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '联系方式',
  `examine` tinyint(1) NOT NULL DEFAULT '0' COMMENT '审核状态',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`recruit_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of recruit
-- ----------------------------
BEGIN;
INSERT INTO `recruit` (`recruit_id`, `user_id`, `job_name`, `job_description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (1, 1, 'java开发', '团队招募新成员，面向大学生群体。能独立思考，敢于挑战，敢于承担责任。对后端开发感兴趣，有一定代码基础，欢迎通过右上角联系方式联系我们。', '15078889974', 1, '2024-03-04 01:35:46', '2024-03-08 02:34:26');
INSERT INTO `recruit` (`recruit_id`, `user_id`, `job_name`, `job_description`, `contact_number`, `examine`, `create_time`, `update_time`) VALUES (2, 1, '算法工程师-机器学习', '职位要求\n1、本科级以上学历，计算机等相关专业；\n2、熟悉常用机器学习算法，对模式识别、深度学习、增强学习等相关领域，极佳的工程实现能力，精通C/C++、Java、Python等至少一门编程语言；\n3、有数理分析方面良好的素养以及数理统计基础；有良好的数据敏感能力、较强的逻辑分析能力；\n4、有较强的学习能力，对新事物保有好奇心，并能快速适应新环境；\n5、有良好的沟通能力和团队协同能力；能与他人合作，共同完成目标；\n6、对所在领域有热情，善于独立思考并反思总结。', '18637825494', 1, '2024-03-08 02:44:39', '2024-03-08 02:45:22');
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` int NOT NULL COMMENT '角色编号',
  `role_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色名称',
  `description` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '角色描述',
  `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`role_id`, `role_name`, `description`, `enable`, `create_time`, `update_time`) VALUES (0, 'Admin', '管理员', 1, '2024-02-24 08:36:05', '2024-02-24 08:42:00');
INSERT INTO `sys_role` (`role_id`, `role_name`, `description`, `enable`, `create_time`, `update_time`) VALUES (1, 'Teacher', '教师', 1, '2024-02-24 08:38:15', '2024-02-24 08:42:05');
INSERT INTO `sys_role` (`role_id`, `role_name`, `description`, `enable`, `create_time`, `update_time`) VALUES (2, 'Student', '学生', 1, '2024-02-24 08:41:07', '2024-02-24 08:42:08');
INSERT INTO `sys_role` (`role_id`, `role_name`, `description`, `enable`, `create_time`, `update_time`) VALUES (3, 'Normal', '普通用户', 1, '2024-02-24 08:41:53', '2024-02-24 08:42:14');
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `role_id` int NOT NULL COMMENT '角色编号',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户昵称',
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '手机号',
  `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `role_id`, `user_name`, `password`, `nick_name`, `phone_number`, `enable`, `create_time`, `update_time`) VALUES (1, 0, 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', '唯一超管', '15078889974', 1, '2024-02-23 18:04:06', '2024-02-28 12:45:53');
INSERT INTO `sys_user` (`id`, `role_id`, `user_name`, `password`, `nick_name`, `phone_number`, `enable`, `create_time`, `update_time`) VALUES (2, 1, 'lujiahui', '38e3742b41f69a32702bd08aa9d2f04fb5cfb4f42bc4890f5f50abb64acb4f0d', 'Cuerz', '16845298468', 1, '2024-02-23 05:13:23', '2024-03-07 03:06:20');
INSERT INTO `sys_user` (`id`, `role_id`, `user_name`, `password`, `nick_name`, `phone_number`, `enable`, `create_time`, `update_time`) VALUES (3, 2, 'zhanglin', '42722a89e8d420ff5e98f2bf333d232f3d336ea37c9438216bbb30089d607f94', 'Cheung0-bit', '15052186453', 1, '2024-02-23 00:42:23', '2024-05-17 01:19:26');
INSERT INTO `sys_user` (`id`, `role_id`, `user_name`, `password`, `nick_name`, `phone_number`, `enable`, `create_time`, `update_time`) VALUES (4, 3, 'wuchenghao', '42722a89e8d420ff5e98f2bf333d232f3d336ea37c9438216bbb30089d607f94', 'WCH.', '15078889974', 1, '2024-02-25 09:26:52', '2024-03-08 08:40:26');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
